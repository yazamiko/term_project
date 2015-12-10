<?php
	//Entity Item
	class top50 {
		//class attr
		private $itemNumber;
		private $promoCode;
		private $fullRetailPrice;
		private $salePrice;
		private $savings;
		private $eventCodes;

		//construct
		public function __construct() {

		}

		//setters and getters
		/*--------------------
			Event Code
		 ---------------------*/
		public function setItemNumber($itemNumber) {
			$this->itemNumber = $itemNumber;
		}

		public function getItemNumber() {
			return $this->itemNumber;
		}
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
			Notes
		 ---------------------*/
		public function setFullRetailPrice($fullRetailPrice) {
			$this->fullRetailPrice = $fullRetailPrice;
		}

		public function getFullRetailPrice() {
			return $this->fullRetailPrice;
		}

		public function setSalePrice($salePrice) {
			$this->salePrice = $salePrice;
		}

		public function getSalePrice() {
			return $this->salePrice;
		}
		
		public function setSavings($savings) {
			$this->savings = $savings;
		}

		public function getSavings() {
			return $this->savings;
		}

		public function setEventCode($eventCodes) {
			$this->eventCodes = $eventCodes;
		}

		public function getEventCode() {
			return $this->eventCodes;
		}
	}
?>