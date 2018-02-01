An Express project to demonstrate the Laser security module
----------------------------------------------------------

It exposes the POST service to update the `State` of the artefact

#### * Make POST request at `http://<ip-address-server>:3300/artefactUpdate`
#### * Add two attributes in the POST request `id` and `state`
#### * `id` contains a integer value and should have the value of Artefact serial number in the list
#### * `state` it should contain string value. Two values are allowed: 1. Lost 2. Present