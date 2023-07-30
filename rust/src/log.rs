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

use crate::ext::ProcessInformation;


pub struct Logger;

/* Logger Implementation
*/
impl Logger {

    /* Prints out all processes that have a window to them. */
    pub fn get(&mut self) -> Vec<ProcessInformation> {
        let mut applications: Vec<ProcessInformation> = Vec::new();

        // Create Unsafe Block
        unsafe {
            // Use EnumWindows to create a loop that goes through all applications and link it to a callback method.
            EnumWindows(Some(Self::enum_callback), &mut applications as *mut Vec<ProcessInformation> as LPARAM);
        }
        
        return applications;
    }

    /**
     * Callback method used in EnumWindows.
     */
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
                let process: ProcessInformation = ProcessInformation {name: window_title, process_id: lpdw_process_id};

                // Save to vector only if it hasn't already been saved.
                if !applications.contains(&process) {
                    applications.push(process);
                }
            }
        }

        return 1;
    }
}

/* Default constructor for logger */
impl Default for Logger {
    fn default() -> Self {
        return Self {};
    }
}

