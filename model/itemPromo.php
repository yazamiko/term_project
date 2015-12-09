<?php
	//Entity ItemPromo
	class itemPromo {
		//class attr
		private $promoCode;
		private $itemNumber;
		private $itemDescription;
		private $fullRetailPrice;
		private $salePrice;

		//construct
		public function __construct() {

		}

		//setters and getters
		/*--------------------
			Promo Code
		 ---------------------*/
		public function setPromoCode($promoCode) {
			$this->promoCode = $promoCode;
		}

		public function getPromoCode() {
			return $this->promoCode;
		}
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
		Item Full Retail Price
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