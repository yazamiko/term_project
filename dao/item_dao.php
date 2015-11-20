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
		public function readByProperty($itemNum, $itemDesc, $cat, $deptName) {
            $sqlStmt = "";
            
            if($itemNum != "")
                $sqlStmt = $sqlStmt."(ItemNumber LIKE '".$itemNum."%') AND ";
            
            if($itemDesc != "")
                $sqlStmt = $sqlStmt."(ItemDescription LIKE '%".$itemDesc."%') AND ";
            
            if($cat != "")
                $sqlStmt = $sqlStmt."(Category LIKE '%".$cat."%') AND ";
            
            if($deptName != "")
                $sqlStmt = $sqlStmt."(DepartmentName LIKE '%".$deptName."%') AND ";
            
            if($sqlStmt != "")
                $sqlStmt = substr($sqlStmt, 0, -5);
            else
                $sqlStmt = "1";
            
            $stmt = $this->conn->prepare("SELECT * FROM Item WHERE ( ".$sqlStmt." )");

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

		public function readByItemNumber($itemNumber) {
			$stmt = $this->conn->prepare("SELECT * FROM Item WHERE ItemNumber = :value");

			$stmt->bindParam(':value', $itemNumber);
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
				Get retailPrice from Item (it's needed to calculate the new retail price)
			*/
			$stmt = $this->conn->prepare("SELECT FullRetailPrice
				FROM Item WHERE ItemNumber=$itemNumber");
			$stmt->execute();

			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			$retailPrice = floatval($row['FullRetailPrice']);

			//Update new sale price based on promotion type
			if($promoType == 'Dollar') $retailPrice -= $amountOff;
			else $retailPrice -= ($retailPrice * $amountOff);

			$stmt = $this->conn->prepare("INSERT INTO PromotionItem(PromoCode, 
				ItemNumber, SalePrice) 
				VALUES ($promoCode, $itemNumber, $retailPrice)");
			
			try {
				$stmt->execute();
				//prepare an array to json_encode
				return array('status' => true, 'msg' => 'Item promotion table was successfully updated!');
			} catch (PDOException $e) {
				//prepare an array to json_encode
				return array('status' => false, 'msg' => $e->getMessage() + $eventCodeBefore);
			}
			
		}
		// Remove Item from Promotion using item number and promotion code
		public function removeItemFromPromotion($itemNumber, $promoCode) {

			$stmt = $this->conn->prepare("DELETE FROM PromotionItem WHERE PromoCode = $promoCode AND ItemNumber = $itemNumber");
			$stmt->execute();
		}

		//update item
		public function update($item) {
			session_start();
			$itemNumberBefore = $_SESSION["edit_item"];

			$stmt = $this->conn->prepare("UPDATE Item 
				SET ItemNumber = :item_number, ItemDescription = :item_desc, Category = :category, 
				DepartmentName = :dept_name, PurchaseCost = :purchase_cost, FullRetailPrice = :full_retail_price
				WHERE ItemNumber = :item_number_before" );
			$stmt->bindParam(':item_number', $item->getItemNumber());
			$stmt->bindParam(':item_desc', $item->getItemDescription());
			$stmt->bindParam(':category', $item->getCategory());
			$stmt->bindParam(':dept_name', $item->getDepartmentName());
			$stmt->bindParam(':purchase_cost', $item->getPurchaseCost());
			$stmt->bindParam(':full_retail_price', $item->getFullRetailPrice());
			$stmt->bindParam(':item_number_before', $itemNumberBefore);

			try {
				$stmt->execute();
				//prepare an array to json_encode
				return array('status' => true, 'msg' => 'Item was successfully edited!');
			} catch (PDOException $e) {
				//prepare an array to json_encode
				return array('status' => false, 'msg' => $e->getMessage() + $itemNumberBefore);
			}
		}
		//delete item from database using its id
		public function delete($id) {

		}
	}
?>
