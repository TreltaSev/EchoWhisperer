mod log;
mod ext;
extern crate winapi;

use log::{Logger, Entry};
use ext::ProcessInformation;

fn main () {
    let mut instance: Logger = Logger::new(String::from("test.bin"));
    // let processes: Vec<ProcessInformation> = instance.get();
    // for process in processes {
    //     println!("Name: [{name:}] | ID: [{id:}]", name=process.name, id=process.process_id)
    // }
    match instance.add(Entry {name: String::from("testname.exe"), time: 100, id: 999, is_favorite: true}) {
        Ok (_) => {
            print!("All Good!");
        }
        Err(error) => {
            print!("{}", error);
        }
    }
}