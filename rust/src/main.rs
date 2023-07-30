mod log;
mod ext;
extern crate winapi;

use log::Logger;
use ext::ProcessInformation;

fn main () {
    let mut instance: Logger = Logger::default();
    let processes: Vec<ProcessInformation> = instance.get();

    for process in processes {
        println!("Name: [{name:}] | ID: [{id:}]", name=process.name, id=process.process_id)
    }
}