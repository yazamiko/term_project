<?php
	class MySQLConnection {
		public static function getConnection(){
			$servername = "csdb.brockport.edu";
			$username = "gbarb2";
			$password = "river123";
			$dbname = "gbarb2_fall15_1";
			
			$conn=null;
			try {
				$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			}
			catch(PDOException $e) {
				echo "Connection failed(clientDAO): " . $e->getMessage();
			}
		}
	}
?>
