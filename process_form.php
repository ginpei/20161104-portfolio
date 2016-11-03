<?php 

// Lets get these variable that were passed by Ajax "GET" request
$name = $_REQUEST["name"];
$email = $_REQUEST["email"];
$message = $_REQUEST["message"];

sleep(3);

//send email
$send = mail($email,"Test Email",$message);

//Lets check if the email was sent
if ($send)
{
	echo "<font color='green'>";
	echo "You have successfully submitted your data to us ".$name.'<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>';
	echo "</font><br>";
	echo "Here is your message that was sent: ";
	echo "<br>";
	echo $message;
}

// If not sent for some reason
else
{
	echo "<font color='red'>";
	echo "Sorry ".$name.", could not send email, check php/mail configuration".
	'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
	echo "</font><br>";
}

?>
