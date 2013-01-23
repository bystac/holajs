<?php
// simple server to return random 0,1
header('Content-type: application/json');

// verify we have input
$user_index = isset($_GET['i']) ? (int)$_GET['i'] : null;

// no user index? then return 0-offline
if ($user_index === null) {
	print json_encode(0);
} else {
// otherwise return random status
	print json_encode(rand(0,1));
}
