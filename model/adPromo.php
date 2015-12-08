<?php
	//Entity Item
	class adPromo {
		//class attr
		private $eventCode;
		private $promoCode;
		private $notes;

		//construct
		public function __construct() {

		}

		//setters and getters
		/*--------------------
			Event Code
		 ---------------------*/
		public function setEventCode($eventCode) {
			$this->eventCode = $eventCode;
		}

		public function getEventCode() {
			return $this->eventCode;
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
		public function setNotes($notes) {
			$this->notes = $notes;
		}

		public function getNotes() {
			return $this->notes;
		}
		 
	}
?>