<?php
	//Entity Promo
	class Promo {
		//class attr
		private $promoCode;
		private $name;
		private $description;
		private $amountOff;
		private $promoType;

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
				Name
		 ---------------------*/
		public function setName($name) {
			$this->name = $name;
		}

		public function getName() {
			return $this->name;
		}
		/*--------------------
			  Description
		 ---------------------*/
		public function setDescription($description) {
			$this->description = $description;
		}

		public function getDescription() {
			return $this->description;
		}
		/*--------------------
			   Amount Off
		 ---------------------*/
		 public function setAmountOff($amountOff) {
		 	$this->amountOff = $amountOff;
		 }

		 public function getAmountOff() {
		 	return $this->amountOff;
		 }
		 /*--------------------
				Promo Type
		 ---------------------*/
		 public function setPromoType($promoType) {
		 	$this->promoType = $promoType;
		 }

		 public function getPromoType() {
		 	return $this->promoType;
		 }
	}
?>