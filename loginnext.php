<?php

session_start();

$conn = mysqli_connect('localhost','root','');
mysqli_select_db($conn,'tictactoe');
$email = $_POST['email'];
$password = $_POST['password'];

$s = "SELECT * FROM `table` where email = '$email' and password = '$password'";
$result = mysqli_query($conn,$s);
$num = mysqli_num_rows($result);

if($num == 1)
    {
     header("location: T1-H1-L3.html");
    }
    else 
    {
    echo "Your Login Name or Password is invalid";
    }
?>