<?php
	require('../interfaces/dao_interface.php');
	require('../mysql_conn.php');
	require('../model/item.php');

	class ItemDAO implements iDAO  {
		//database connection
		private $conn;

		//construct
		public function __construct() {
			//estabilish a connection
			$this->conn = MySQLConnection::getConnection();
		}

		//insert a new item in database
		public function create($item) {
			$stmt = $this->conn->prepare("INSERT INTO 
				Item(ItemNumber, ItemDescription, Category, 
					DepartmentName, PurchaseCost, FullRetailPrice) 
				VALUES (:item_number, :item_desc, :category, :dept_name,
					:purchase_cost, :full_retail_price)");
			$stmt->bindParam(':item_number', $item->getItemNumber());
			$stmt->bindParam(':item_desc', $item->getItemDescription());
			$stmt->bindParam(':category', $item->getCategory());
			$stmt->bindParam(':dept_name', $item->getDepartmentName());
			$stmt->bindParam(':purchase_cost', $item->getPurchaseCost());
			$stmt->bindParam(':full_retail_price', $item->getFullRetailPrice());

			try {
				$stmt->execute();
				//prepare an array to json_encode
				return array('status' => true, 'msg' => 'Item was successfully added!');
			} catch (PDOException $e) {
				//prepare an array to json_encode
				return array('status' => false, 'msg' => $e->getMessage());
			}
			
		}
		//retrieve item from database using its id
		public function read($id) {

		}
		public function readByProperty($value, $property) {
			$stmt = $this->conn->prepare("SELECT * FROM Item WHERE $property LIKE :value");

			strtoupper($value);
			if($property == "ItemDescription") $value = "%".$value."%";
			else $value = $value."%";

			$stmt->bindParam(':value', $value);
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
		// add item to promotion using item number and promotion code
		public function addItemToPromotion($itemNumber, $promoCode) {
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

			$stmt = $this->conn->prepare("INSERT INTO PromotionItem(PromoCode, 
				ItemNumber, SalePrice) 
				VALUES ($promoCode, $itemNumber, $purchaseCost)");
			$stmt->execute();
		}
		//update item
		public function update($item) {

		}
		//delete item from database using its id
		public function delete($id) {

		}
	}
?>