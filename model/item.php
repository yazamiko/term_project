<?php
	//Entity Item
	class Item {
		//class attr
		private $itemNumber;
		private $itemDescription;
		private $category;
		private $departmentName;
		private $purchaseCost;
		private $fullRetailPrice;
		private $salePrice;

		//construct
		public function __construct() {

		}

		//setters and getters
		/*--------------------
			Item Number
		 ---------------------*/
		public function setItemNumber($itemNumber) {
			$this->itemNumber = $itemNumber;
		}

		public function getItemNumber() {
			return $this->itemNumber;
		}
		/*--------------------
			Item Description
		 ---------------------*/
		public function setItemDescription($itemDescription) {
			$this->itemDescription = $itemDescription;
		}

		public function getItemDescription() {
			return $this->itemDescription;
		}
		/*--------------------
			Category
		 ---------------------*/
		public function setCategory($category) {
			$this->category = $category;
		}

		public function getCategory() {
			return $this->category;
		}
		/*--------------------
			Department Name
		 ---------------------*/
		 public function setDepartmentName($departmentName) {
		 	$this->departmentName = $departmentName;
		 }

		 public function getDepartmentName() {
		 	return $this->departmentName;
		 }
		 /*--------------------
			Purchase Cost
		 ---------------------*/
		 public function setPurchaseCost($purchaseCost) {
		 	$this->purchaseCost = $purchaseCost;
		 }

		 public function getPurchaseCost() {
		 	return $this->purchaseCost;
		 }
		 /*--------------------
			Full Retail Price
		 ---------------------*/
		 public function setFullRetailPrice($fullRetailPrice) {
		 	$this->fullRetailPrice = $fullRetailPrice;
		 }

		 public function getFullRetailPrice() {
		 	return $this->fullRetailPrice;
		 }
		  /*--------------------
			Sale Price
		 ---------------------*/
		 public function setSalePrice($salePrice) {
		 	$this->salePrice = $salePrice;
		 }

		 public function getSalePrice() {
		 	return $this->salePrice;
		 }
	}
?>