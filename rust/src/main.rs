mod log;
mod ext;
mod server;
extern crate winapi;

use log::log_loop;


fn main () {
    log_loop();
    // Breh 99.9865% accuracy with a 5 second loop.
    // 99.9283% accuracy with a 1 second loop.

}