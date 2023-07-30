mod log;
mod ext;
extern crate winapi;

use log::Logger;
// use ext::ProcessInformation;

fn main () {
    Logger::new(String::from("test.bin"));
    // let processes: Vec<ProcessInformation> = instance.get();
    // for process in processes {
    //     println!("Name: [{name:}] | ID: [{id:}]", name=process.name, id=process.process_id)
    // }
    
    // match instance.bulk_add(instance.get()) {
    //     Ok (_) => {
    //         print!("All Good!");
    //     }
    //     Err(error) => {
    //         print!("{}", error);
    //     }
    // }
}