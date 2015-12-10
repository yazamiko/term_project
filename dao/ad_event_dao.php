<?php
	require('../interfaces/dao_interface.php');
	require('../model/ad.php');
	require('../mysql_conn.php');
	include_once('../model/promo.php');
	include_once('../model/adPromo.php');
	include_once('../model/top50.php');

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
					
			$eventCode = $ad->getEventCode();
			$adName = $ad->getAdName();
			$adDesc = $ad->getAdDescription();
			$startDate = $ad->getStartDate();
			$endDate = $ad->getEndDate();
			$adType = $ad->getAdType();
			
			$stmt->bindParam(':event_code', $eventCode);
			$stmt->bindParam(':event_name', $adName);
			$stmt->bindParam(':ad_description', $adDesc);
			$stmt->bindParam(':start_date', $startDate);
			$stmt->bindParam(':end_date', $endDate);
			$stmt->bindParam(':ad_type', $adType);
			
			try {
				$stmt->execute();
				//prepare an array to json_encode
				return array('status' => true, 'msg' => 'Ad event was successfully added!');
			} catch (PDOException $e) {
				//prepare an array to json_encode
				return array('status' => false, 'msg' => $e->getMessage());
			}
		
		}
		//retrieve item from database using its id
		public function read($id) {

		}
		public function readByProperty($eventCode, $eventName, $startDate, $endDate, $desc) {
			$sqlStmt = "";
			
			if($eventCode != "")
				$sqlStmt = $sqlStmt."(EventCode LIKE '%".$eventCode."%') AND ";
			
			if($eventName != "")
				$sqlStmt = $sqlStmt."(Name LIKE '%".$eventName."%') AND ";
			
			if($startDate != "")
				$sqlStmt = $sqlStmt."(StartDate LIKE '%".$startDate."%') AND ";
			
			if($endDate != "")
				$sqlStmt = $sqlStmt."(EndDate LIKE '%".$endDate."%') AND ";
			
			if($desc != "")
				$sqlStmt = $sqlStmt."(Description LIKE '%".$desc."%') AND ";
			
			if($sqlStmt != "")
				$sqlStmt = substr($sqlStmt, 0, -5);
			else
				$sqlStmt = "1";

			$stmt = $this->conn->prepare("SELECT * FROM AdEvent WHERE ( ".$sqlStmt." )");
			
			$stmt->execute();
			
			$array = array();

			$rows = $stmt->fetchAll();
			foreach ($rows as $rs) {
				$adEvent = new adEvent();
				$adEvent->setEventCode($rs['EventCode']);
				$adEvent->setAdName($rs['Name']);
				$adEvent->setStartDate($rs['StartDate']);
				$adEvent->setEndDate($rs['EndDate']);
				$adEvent->setAdDescription($rs['Description']);
				$adEvent->setAdType($rs['AdType']);

				array_push($array, $adEvent);
			}
			return $array;
		}

		public function readByDate($startDate, $endDate) {

			$st = "StartDate >= '" . $startDate . "' AND EndDate <= '" . $endDate."'";
			$sql = "SELECT * FROM AdEvent WHERE (". $st .")";
			//echo $sql;
			$stmt = $this->conn->prepare($sql);
			
			$stmt->execute();
			
			$array = array();

			$rows = $stmt->fetchAll();
			foreach ($rows as $rs) {
				$adEvent = new adEvent();
				$adEvent->setEventCode($rs['EventCode']);
				$adEvent->setAdName($rs['Name']);
				$adEvent->setStartDate($rs['StartDate']);
				$adEvent->setEndDate($rs['EndDate']);
				$adEvent->setAdDescription($rs['Description']);
				$adEvent->setAdType($rs['AdType']);

				array_push($array, $adEvent);
			}
			return $array;
		}
		
		public function retrieveAdEvents($arrEventCodes){
			$sqlStmt = "";
			
			foreach($arrEventCodes as $eventCode)
			{
				$sqlStmt = $sqlStmt."(EventCode = '".$eventCode."') OR ";
			}
			
			if($sqlStmt != "")
				$sqlStmt = substr($sqlStmt, 0, -4);
			else
				$sqlStmt = "1";
			
			$stmt = $this->conn->prepare("SELECT * FROM AdEvent WHERE ( ".$sqlStmt." )");
			
			$stmt->execute();
			
			$array = array();

			$rows = $stmt->fetchAll();
			foreach ($rows as $rs) {
				$adEvent = new adEvent();
				$adEvent->setEventCode($rs['EventCode']);
				$adEvent->setAdName($rs['Name']);
				$adEvent->setStartDate($rs['StartDate']);
				$adEvent->setEndDate($rs['EndDate']);
				$adEvent->setAdDescription($rs['Description']);
				$adEvent->setAdType($rs['AdType']);

				array_push($array, $adEvent);
			}
			return $array;
		}
		
		public function readPromotionFromAdEvent($eventCode) {
			$stmt = $this->conn->prepare("SELECT * FROM Promotion  
				INNER JOIN AdEventPromotion USING(PromoCode)
				WHERE EventCode=:event_code 
				ORDER BY PromoCode ASC");

			$stmt->bindParam(':event_code', $eventCode);
			$stmt->execute();
			
			$array = array();

			$rows = $stmt->fetchAll();
			foreach ($rows as $rs) {
				$promo = new Promo();
				$promo->setPromoCode($rs['PromoCode']);
				$promo->setName($rs['Name']);
				$promo->setDescription($rs['Description']);
				$promo->setAmountOff($rs['AmountOff']);
				$promo->setPromoType($rs['PromoType']);

				array_push($array, $promo);
			}
			return $array;
		}
		
		public function readAdEventPromoCombo($arrEventCode, $arrPromoCode) {
			$sqlStmt = "";
			
			foreach($arrEventCode as $event)
			{
				foreach($arrPromoCode as $promo)
				{
					$sqlStmt .= "(EventCode='".$event."' AND PromoCode='".$promo."') OR ";
				}
			}
			
			if($sqlStmt != "")
				$sqlStmt = substr($sqlStmt, 0, -4);
			else
				$sqlStmt = "1";
			
			$stmt = $this->conn->prepare("SELECT * FROM AdEventPromotion WHERE (".$sqlStmt.") ORDER BY EventCode ASC");
			$stmt->execute();
			
			$array = array();

			$rows = $stmt->fetchAll();
			foreach ($rows as $rs) {
				$adPromo = new AdPromo();
				$adPromo->setEventCode($rs['EventCode']);
				$adPromo->setPromoCode($rs['PromoCode']);
				$adPromo->setNotes($rs['Notes']);
				
				array_push($array, $adPromo);
			}
			return $array;
		}
		
		//update adEvent
		public function update($adEvent) {
			session_start();
			$eventCodeBefore = $_SESSION["edit_ad_event"];

			$stmt = $this->conn->prepare("UPDATE AdEvent 
				SET EventCode = :event_code, Name = :event_name, StartDate = :start_date, 
				EndDate = :end_date, Description = :ad_description, AdType = :ad_type
				WHERE EventCode = :event_code_before" );
				
			$eventCode = $adEvent->getEventCode();
			$adName = $adEvent->getAdName();
			$startDate = $adEvent->getStartDate();
			$endDate = $adEvent->getEndDate();
			$adDescription = $adEvent->getAdDescription();
			$adType = $adEvent->getAdType();
			
			$stmt->bindParam(':event_code', $eventCode);
			$stmt->bindParam(':event_name', $adName);
			$stmt->bindParam(':start_date', $startDate);
			$stmt->bindParam(':end_date', $endDate);
			$stmt->bindParam(':ad_description', $adDescription);
			$stmt->bindParam(':ad_type', $adType);
			$stmt->bindParam(':event_code_before', $eventCodeBefore);

			try {
				$stmt->execute();
				//prepare an array to json_encode
				return array('status' => true, 'msg' => 'Ad event was successfully edited!');
			} catch (PDOException $e) {
				//prepare an array to json_encode
				return array('status' => false, 'msg' => $e->getMessage() + $eventCodeBefore);
			}
		}
		public function updateEventPromotionNotes($eventCode, $promoCode, $notes)
		{
			//this function only updates the notes in the table
			$stmt = $this->conn->prepare("UPDATE AdEventPromotion 
				SET Notes = :notes WHERE EventCode = :event_code AND PromoCode = :promo_code");
			
			$stmt->bindParam(':event_code', $eventCode);
			$stmt->bindParam(':promo_code', $promoCode);
			$stmt->bindParam(':notes', $notes);
			
			try {
				$stmt->execute();
				//prepare an array to json_encode
				return array('status' => true, 'msg' => 'Ad event promotion notes were successfully updated!');
			} catch (PDOException $e) {
				//prepare an array to json_encode
				return array('status' => false, 'msg' => $e->getMessage() + $eventCodeBefore);
			}
		}
		public function addEventToPromotion($eventCode, $promoCode, $notes)
		{
			$stmt = $this->conn->prepare("SELECT * from AdEventPromotion WHERE EventCode='".$eventCode."' AND PromoCode='".$promoCode."'");
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			if (!empty($row)) {
				return array('status' => false, 'msg' => "This promotion: $promoCode is already included in this Ad Event: $eventCode");
			}
			else {

			$stmt = $this->conn->prepare("INSERT INTO AdEventPromotion(EventCode,  
				PromoCode, Notes) VALUES ('$eventCode', '$promoCode', '$notes')");
			
			try {
				$stmt->execute();
				//prepare an array to json_encode
				return array('status' => true, 'msg' => 'Ad event promotion table was successfully updated!');
			} catch (PDOException $e) {
				//prepare an array to json_encode
				return array('status' => false, 'msg' => $e->getMessage() + $eventCodeBefore);
			}
			}
		}
		
		function fetchReport4(){
			$stmt = $this->conn->prepare("SELECT Item.ItemNumber, PromotionItem.PromoCode, Item.FullRetailPrice, 
				(ROUND(PromotionItem.SalePrice, 2)) as SalePrice, (ROUND(Item.FullRetailPrice - PromotionItem.SalePrice, 2)) as Savings,
				GROUP_CONCAT(DISTINCT AdEventPromotion.EventCode SEPARATOR ', ') AS EventCodes
				FROM Item
				INNER JOIN PromotionItem ON Item.ItemNumber = PromotionItem.ItemNumber
				INNER JOIN AdEventPromotion ON PromotionItem.PromoCode = AdEventPromotion.PromoCode
				GROUP BY Item.ItemNumber
				ORDER BY (
				ROUND(Item.FullRetailPrice - PromotionItem.SalePrice, 2)
				) DESC 
				LIMIT 0 , 50" );
			$stmt->execute();
			
			$array = array();

			$rows = $stmt->fetchAll();
			foreach ($rows as $rs) {
				$top50 = new Top50();
				$top50->setItemNumber($rs['ItemNumber']);
				$top50->setPromoCode($rs['PromoCode']);
				$top50->setFullRetailPrice($rs['FullRetailPrice']);
				$top50->setSalePrice($rs['SalePrice']);
				$top50->setSavings($rs['Savings']);
				$top50->setEventCode($rs['EventCodes']);
				
				array_push($array, $top50);
			}
			return $array;
		}
		//delete adEvent from database using its id
		public function delete($id) {

		}
	}
?>
