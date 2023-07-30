/**
 * rust.src.ext.rs
 * ~~~~~~~~~~~~~~~
 * This file holds extra and external variables, implementations, enums, objects
 * for use throughout the program.
 */


 /* ProcessInformation structure for easy displaying of processes with enumwindows*/
 #[derive(PartialEq)]
 pub struct ProcessInformation {
    pub name: String,
    pub process_id: u16,
 }