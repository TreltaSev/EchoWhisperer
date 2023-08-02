/** rust.src.server.rs
 *  Server methods for program, listens to websocket connections that 
 *  are secure via ssl, though its not needed, its dope to use.
 */
extern crate ws;
use serde_json::{Result, Value};
use serde::{Deserialize, Serialize};

use ws::listen;

#[derive(Deserialize)]
struct WebSocketRequest {
    info: String
}

pub struct Connection;

impl Connection {
    
    pub fn new() {
        if let Err(error) = listen("127.0.0.1:3012", |out| {
            move |_in_message: ws::Message| {
                println!("Server got message '{}'. ", _in_message);    
                let _cloned_message = _in_message.clone();

                if let Ok(_string_message) = _in_message.into_text() {
                    let Request: WebSocketRequest = serde_json::from_str(_string_message.as_str()).unwrap();
                    println!("Info: {info:}", info=Request.info);
                }

                out.send(_cloned_message)
            }
        }) {
            println!("Failed to create WebSocket due to {}", error);
        }
    }
}   