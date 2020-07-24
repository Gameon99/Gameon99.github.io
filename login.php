<!doctype html>
<html>
<head>
<title>TIC TAC TOE</title>
</head>
       <link rel = "stylesheet" type="text/css" href="src/style2.css">
       <link rel = "stylesheet" type = "text/css"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
<body>
    <style>
     .box1{                    
      width: 20px;
      height: 20px;
      background-color: red;
      position: relative;
      animation-name: box1;
      animation-duration: 4s;
      animation-iteration-count: infinite;
      animation-direction:normal;
         
    }

    @keyframes box1 {
      0%   {background-color:deepskyblue; left:220px; top:110px;}
      25%  {background-color:yellow; left:1070px; top:110px;}
      50%  {background-color:deepskyblue; left:1070px; top:550px;}
      75%  {background-color:yellow; left:220px; top:550px;}
      100% {background-color:deepskyblue; left:220px; top:110px;}
        }</style>
    <div class="box1"></div>   <!-- This is a box animation around registration block -->
    <h1 style="font-family:'LUCKIEST-GUY';margin-left:510px;color:yellow;">"TIC-TAC-TOE"</h1>
    <div class="container">
        
        <div class="login-box" style="margin:80px auto;">
        <div class="row">
        <!-- This is a class for left column in row -->  
        <div class="col-md-6 login-left">
            
            <div align="center"><h5 style="padding:10px 10px; background:deepskyblue; color:white;font-size:20px;font-family:serif;">REGISTER HERE</h5></div>
            
            <form action="" method="post">
            <div class="form-group">
            <label>Email :</label><input type="text" name="email" class="form-control" required>
            </div>
                
            <div class="form-group">
            <label>Password :</label><input type="password" name="password" class="form-control" required>
            </div>
                
            <div align="right"><input type="submit" value="Register" name="register"></div>
                
            </form>
        </div>
         <!-- This is a class for right column in row -->    
        <div class="col-md-6 login-right">
            
            <div align="center"><h5 style="padding:10px 10px; background:deepskyblue; color:white;font-size:20px;font-family:serif;">LOGIN HERE</h5></div>
            
            <form action="loginnext.php" method="post">
            <div class="form-group">
                <label>Email :</label><input type="text" name="email" class="form-control" required>
            </div>
                
            <div class="form-group">
            <label>Password :</label><input type="password" name="password" class="form-control" required>
            </div>
                
            <div align="right"><input type="submit" value="login" name="login"></div>
            </form>
        </div>
            
     </div>
     </div>
     </div>
    <!-- In case of new user, registration php form acts --> 
    <?php
    if(isset($_POST["register"])){
      if(!empty($_POST['email']) && !empty($_POST['password'])){
         $conn = mysqli_connect('localhost','root','');
         mysqli_select_db($conn,'tictactoe');
         $email = $_POST['email'];
         $password = $_POST['password'];
         $s = "SELECT * FROM `table` where email='$email'";
         $result = mysqli_query($conn,$s);
         $num = mysqli_num_rows($result);
           if($num == 0)
             {
             $sql = "INSERT INTO `table`(`email`, `password`) VALUES ('$email','$password')";
             $result = mysqli_query($conn, $sql);
               if($result){
                 echo "<p style='color:yellow;margin-left:450px;font-size:20px;'>"."Account Created Successfully...Please login"."</p>";
                 }
             else
                 {
                 echo "<p style='color:yellow;margin-left:450px;font-size:20px;'>"."Failure!"."</p>";
                 }
             }
         else
         {
         echo "<p style='color:yellow;margin-left:450px;font-size:20px;'>"."That email already exists! Please try again."."</p>";
         }
         }
     else 
     {
     ?>
     <?php
     }
    }
    ?>
</body>
</html>