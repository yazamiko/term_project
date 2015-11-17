<?php
	require('../interfaces/dao_interface.php');
	require('../model/promo.php');
	require('../mysql_conn.php');
	include_once('../model/item.php');

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

		public function readItemFromPromotion($promoCode) {
			$stmt = $this->conn->prepare("SELECT * FROM Item 
				INNER JOIN PromotionItem USING(ItemNumber) 
				WHERE PromoCode=:promo_code");

			$stmt->bindParam(':promo_code', $promoCode);
			$stmt->execute();
			
			$array = array();

			$rows = $stmt->fetchAll();
			foreach ($rows as $rs) {
				$item = new Item();
				$item->setItemNumber($rs['ItemNumber']);
				$item->setItemDescription($rs['ItemDescription']);
				$item->setCategory($rs['Category']);
				$item->setDepartmentName($rs['DepartmentName']);
				$item->setPurchaseCost($rs['PurchaseCost']);
				$item->setFullRetailPrice($rs['FullRetailPrice']);

				array_push($array, $item);
			}
			return $array;
		}
		//retrieve promo from database using its id
		public function read($id) {
			
		}
		//update promo
		public function update($promo) {
			session_start();
			$itemNumberBefore = $_SESSION["edit_promo"];

			$stmt = $this->conn->prepare("UPDATE Promotion SET 
				Name = :name, Description = :description, 
				AmountOff = :amount_off, PromoType = :promo_type 
				WHERE PromoCode = :item_number_before" ); 
			$stmt->bindParam(':item_number_before', $itemNumberBefore);
			$stmt->bindParam(':name', $promo->getName());
			$stmt->bindParam(':description', $promo->getDescription());
			$stmt->bindParam(':amount_off', $promo->getAmountOff());
			$stmt->bindParam(':promo_type', $promo->getPromoType());
			try {
				$stmt->execute();
				$update_item = $this->updatePromotionItem($promoCode);
				//prepare an array to json_encode
				//return array('status' => true, 'msg' => 'Promotion was successfully edited!');
			} catch (PDOException $e) {
				//prepare an array to json_encode
				return array('status' => false, 'msg' => $e->getMessage());
			}
		}

		public function updatePromotionItem($promoCode) {

			$stmt = $this->conn->prepare("SELECT ItemNumber FROM Item 
				INNER JOIN PromotionItem USING(ItemNumber) 
				WHERE PromoCode=:promo_code");

			$stmt->bindParam(':promo_code', $promoCode);
			$stmt->execute();

			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			$itemNumber = $row['ItemNumber'];
			
			/*
				Get AmountOff and PromoType from Promotion (it's needed to calculate the new retail price)
			*/
			$stmt = $this->conn->prepare("SELECT AmountOff, PromoType
				FROM Promotion WHERE PromoCode=$promoCode");
			$stmt->execute();

			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			$promoType = $row['PromoType'];
			$amountOff = floatval($row['AmountOff']);
			/*
				Get PurchaseCost from Item (it's needed to calculate the new retail price)
			*/
			$stmt = $this->conn->prepare("SELECT PurchaseCost
				FROM Item WHERE ItemNumber=$itemNumber");
			$stmt->execute();

			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			$purchaseCost = floatval($row['PurchaseCost']);
			$purchaseCost;

			//Update new sale price based on promotion type
			if($promoType == 'Dollar') $purchaseCost -= $amountOff;
			else $purchaseCost -= ($purchaseCost * $amountOff);

			$stmt = $this->conn->prepare("Update PromotionItem SET SalePrice = $purchaseCost 
				WHERE PromoCode = $promoCode and ItemNumber = $itemNumber");
			try {
				$stmt->execute();
				//prepare an array to json_encode
				return array('status' => true, 'msg' => 'Promotion was successfully edited!');
			} catch (PDOException $e) {
				//prepare an array to json_encode
				return array('status' => false, 'msg' => $e->getMessage());
			}

		}

		//delete promo from database using its id
		public function delete($id) {

		}
	}
?>
