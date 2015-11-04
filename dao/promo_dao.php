<?php
	require('../interfaces/dao_interface.php');
	require('../model/promo.php');
	require('../mysql_conn.php');

	class PromoDAO implements iDAO  {
		//database connection
		private $conn;

		//construct
		public function __construct() {
			//estabilish a connection
			$this->conn = MySQLConnection::getConnection();
		}

		//insert a new promo in database
		public function create($promo) {
			$stmt = $this->conn->prepare("INSERT INTO 
				Promotion(Name, Description, 
					AmountOff, PromoType) 
				VALUES (:name, :description, :amount_off,
					:promo_type)");
			$stmt->bindParam(':name', $promo->getName());
			$stmt->bindParam(':description', $promo->getDescription());
			$stmt->bindParam(':amount_off', $promo->getAmountOff());
			$stmt->bindParam(':promo_type', $promo->getPromoType());

			$stmt->execute();
			
			try {
				$stmt->execute();
				//prepare an array to json_encode
				return array('status' => true, 'msg' => 'Promotion was successfully added!');
			} catch (PDOException $e) {
				//prepare an array to json_encode
				return array('status' => false, 'msg' => $e->getMessage());
			}
		}
		public function readByProperty($value, $property) {
			$sql = "SELECT * FROM Promotion WHERE UPPER($property) LIKE :value";
			$stmt = $this->conn->prepare($sql);
			
			strtoupper($value);
			if($property != "PromoCode") $value = "%".$value."%";
			else $value = $value."%";

			$stmt->bindParam(':value', $value);
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
		//retrieve promo from database using its id
		public function read($id) {
			
		}
		//update promo
		public function update($promo) {

		}
		//delete promo from database using its id
		public function delete($id) {

		}
	}
?>
