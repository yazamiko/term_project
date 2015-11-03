<?php
	require('../interfaces/dao_interface.php');
	require('../model/ad.php');
	require('../mysql_conn.php');

	class AdDAO implements iDAO  {
		//database connection
		private $conn;

		//construct
		public function __construct() {
			//estabilish a connection
			$this->conn = MySQLConnection::getConnection();
		}

		//insert a new item in database
		public function create($ad) {
			$stmt = $this->conn->prepare("INSERT INTO 
				AdEvent(EventCode, Name, StartDate,
					 EndDate,  Description, AdType) 
				VALUES (:event_code, :event_name, :ad_description, :start_date,
					:end_date, :ad_type)");
			$stmt->bindParam(':event_code', $ad->getEventCode());
			$stmt->bindParam(':event_name', $ad->getAdName());
			$stmt->bindParam(':ad_description', $ad->getAdDescription());
			$stmt->bindParam(':start_date', $ad->getStartDate());
			$stmt->bindParam(':end_date', $ad->getEndDate());
			$stmt->bindParam(':ad_type', $ad->getType());

			$stmt->execute();
		}
		//retrieve item from database using its id
		public function read($id) {

		}
		//update item
		public function update($item) {

		}
		//delete item from database using its id
		public function delete($id) {

		}
	}
?>