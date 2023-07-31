mod log;
mod ext;
mod server;
extern crate winapi;

use log::Logger;
use ext::ProcessInformation;
use std::time::Instant;


fn _log () {
    let mut instance = Logger::new(String::from("test.bin"));
    let processes: Vec<ProcessInformation> = instance.get();
    let start = Instant::now();
    match instance.bulk_update(processes) {
        Ok(_) => {}
        Err(error) => {println!("{}", error)}
    }
    let end = Instant::now();
    println!("All Ok! Finsihed in {ms:}mics | {mili:}milis", ms=(end-start).as_micros(), mili=(end-start).as_millis());
}

fn main () {
    
    // Breh 99.9865% accuracy with a 5 second loop.
    // 99.9283% accuracy with a 1 second loop.

}