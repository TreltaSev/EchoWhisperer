/** Log Implementation
 * Logs all the applications in the current computer.
 */

// WinApi Modules
use winapi::um::winuser::{EnumWindows, GetWindowThreadProcessId, IsWindowVisible};
use winapi::shared::windef::HWND;
use winapi::shared::minwindef::{LPARAM, DWORD};
use winapi::um::psapi::K32GetModuleBaseNameW;
use winapi::um::processthreadsapi::OpenProcess;
use winapi::um::winnt::{PROCESS_QUERY_INFORMATION, PROCESS_VM_READ, HANDLE};

// Other Modules
use std::fs::File;
use std::error::Error;
use std::io::{Read, Write};
use bincode::{serialize, deserialize};
use crate::ext::{ProcessInformation, Entry};



pub struct Logger {
    bin_path: String
}

/* Logger Implementation */
impl Logger {

    /* Prints out all processes that have a window to them. */
    #[allow(dead_code)]
    pub fn get(&mut self) -> Vec<ProcessInformation> {
        let mut applications: Vec<ProcessInformation> = Vec::new();

        // Create Unsafe Block
        unsafe {
            // Use EnumWindows to create a loop that goes through all applications and link it to a callback method.
            EnumWindows(Some(Self::enum_callback), &mut applications as *mut Vec<ProcessInformation> as LPARAM);
        }
        
        return applications;
    }

    /* Writes a vector of entries to a binary file, takes in a path string  */
    #[allow(dead_code)]
    pub fn write(&mut self, entries: &Vec<Entry>) -> Result<(), Box<dyn Error>> {
        let encoded_entries = serialize(entries)?;
        let mut file = File::create(self.bin_path.to_string())?;
        file.write_all(&encoded_entries)?;
        return Ok(())
    }

    /* Writes a test string  */
    #[allow(dead_code)]
    pub fn write_test(&mut self) -> Result<(), Box<dyn Error>> {
        let mut file = File::create(self.bin_path.to_string())?;
        file.write_all(b"Heheheha?")?;
        return Ok(())
    }

    /* Reads all the entries from a file path */
    #[allow(dead_code)]
    pub fn read(&mut self) -> Result<Vec<Entry>, Box<dyn Error>> {
        let mut file = File::open(self.bin_path.to_string())?;
        let mut buffer = Vec::new();
        file.read_to_end(&mut buffer)?;

        if buffer.is_empty() {
            return Ok(Vec::new());
        }

        let entries: Vec<Entry> = deserialize(&buffer)?;
        return Ok(entries)
    }

    /* Adds an entry to the file */
    #[allow(dead_code)]
    pub fn add (&mut self, entry: Entry) -> Result<(), Box<dyn Error>> {
        let mut entries: Vec<Entry> = self.read()?;

        if self.exists(&entry.name)? == true{
            return Ok(())
        }

        entries.push(entry);
        self.write(&entries)?;
        return Ok(())
    }

    /* Bulk update */
    #[allow(dead_code)]
    pub fn bulk_update(&mut self, processes: Vec<ProcessInformation>) -> Result<(), Box<dyn Error>> {
        let mut out_entries: Vec<Entry> = Vec::new();
        let source_entries = self.read()?;

        for process in processes {
            let mut out_entry = Entry {
                name: process.name, 
                time: 0, 
                id: process.process_id,
                is_favorite: false
            };
            
            if self.spec_exists(&source_entries[..], &out_entry.name)? {
                out_entry = self.spec_find(&source_entries[..], &out_entry.name)?;
            }
            out_entry.time += 5;
            out_entries.push(out_entry);
        }
        self.write(&out_entries)?;
        return Ok(());
    }

    /* Removes an entry from the file with an entry name */
    #[allow(dead_code, unused_must_use)]
    pub fn remove(&mut self, entry_name: String) -> Result<(), Box<dyn Error>> {
        let mut entries: Vec<Entry> = self.read()?;
        entries.retain(|entry| entry.name != entry_name);
        self.write(&entries);
        return Ok(())
    }

    /* Checks if a entry alreayd exists */
    #[allow(dead_code, unused_must_use)]
    pub fn exists(&mut self, entry_name: &String) -> Result<bool, Box<dyn Error>> {
        let entries: Vec<Entry> = self.read()?;
        for entry in entries {
            if entry.name == *entry_name {
                return Ok(true);
            }
        }
        return Ok(false);
    }

    /* Gets entry Special */
    #[allow(dead_code, unused_must_use)]
    pub fn spec_find(&mut self, entries: &[Entry], entry_name: &str) -> Result<Entry, Box<dyn Error>> {
        if let Some(entry) = entries.iter().find(|entry| entry.name == entry_name) {
            return Ok(entry.clone());
        }
        return Ok(Entry {
            name: String::from("=-nf-="), 
            time: 999, 
            id: 999, 
            is_favorite: false});
    }

    /* Gets entry */
    #[allow(dead_code, unused_must_use)]
    pub fn find(&mut self, entry_name: &str) -> Result<Entry, Box<dyn Error>> {
        let entries: Vec<Entry> = self.read()?;
        if let Some(entry) = entries.iter().find(|entry| entry.name == entry_name) {
            return Ok(entry.clone());
        }
        return Ok(Entry {
            name: String::from("=-nf-="), 
            time: 999, 
            id: 999, 
            is_favorite: false});
    }

    

    /* Cross checks a entry with a vector */
    #[allow(dead_code)]
    pub fn spec_exists(&self, entries: &[Entry], entry_name: &str) -> Result<bool, Box<dyn Error>> {
        for entry in entries {
            if entry.name == *entry_name {
                return Ok(true);
            }
        }
        return Ok(false);
    }

    /* Callback method used in EnumWindows. */
    #[allow(dead_code)]
    unsafe extern "system" fn enum_callback(h_wnd: HWND, l_param: LPARAM) -> i32 {

        // Use param from enumwindows
        let applications: &mut Vec<ProcessInformation> = {&mut *(l_param as *mut Vec<ProcessInformation>)};
        if IsWindowVisible(h_wnd) != 0 {
            // Create "buffer" for process id
            let mut lpdw_process_id: u32 = 0;

            // Get Process Id and save it to lpdw_process_id        
            GetWindowThreadProcessId(h_wnd, &mut lpdw_process_id);

            // get handle from process id
            let h_process: HANDLE = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, 0, lpdw_process_id);

            // create buffer for window title
            let mut window_title_buffer: Vec<u16> = vec![0u16; 128];

            // Save window name to buffer
            let get_attempt: DWORD = K32GetModuleBaseNameW(h_process, std::ptr::null_mut(), window_title_buffer.as_mut_ptr(), window_title_buffer.len() as u32);
            
            // Conditional check make sure getmodulebasenamew worked.
            if get_attempt != 0 {

                // Convert u32 to string
                let window_title: String = String::from_utf16_lossy(&window_title_buffer);

                // Save process                
                let process: ProcessInformation = ProcessInformation {name: window_title, process_id: lpdw_process_id as u16};

                // Save to vector only if it hasn't already been saved.
                if !applications.contains(&process) {
                    applications.push(process);
                }
            }
        }

        return 1;
    }

    /* Constructor */
    #[allow(dead_code)]
    pub fn new(path_input: String) -> Logger {
        Logger { bin_path: path_input }
    }
    
}


