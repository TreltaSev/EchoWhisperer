mod log;
mod ext;
extern crate winapi;

use log::Logger;
use ext::ProcessInformation;
use std::time::Instant;


fn stress(vector: &mut Vec<ProcessInformation>, salt: i32) {
    vector.push(ProcessInformation { name: format!("test{a:}", a=salt), process_id: 0 })
}

fn main () {
    let mut instance = Logger::new(String::from("test.bin"));
    let mut processes: Vec<ProcessInformation> = instance.get();

    let start = Instant::now();
    match instance.bulk_update(processes) {
        Ok(_) => {}
        Err(error) => {println!("{}", error)}
    }
    let end = Instant::now();

    println!("All Ok! Finsihed in {ms:}mics | {mili:}milis", ms=(end-start).as_micros(), mili=(end-start).as_millis());
    // Breh 99.9865% accuracy with a 5 second loop.
    // 99.9283% accuracy with a 1 second loop.

}