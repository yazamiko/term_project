<?php
	//Entity Item
	class adEvent {
		//class attr
		private $eventCode;
		private $adName;
		private $adStartDate;
		private $adEndDate;
		private $adDescription;
		private $type;

		//construct
		public function __construct() {

		}

		//setters and getters
		/*--------------------
			Item Number
		 ---------------------*/
		public function setEventCode($eventCode) {
			$this->eventCode = $eventCode;
		}

		public function getEventCode() {
			return $this->eventCode;
		}
		/*--------------------
			Item Description
		 ---------------------*/
		public function setAdDescription($adDescription) {
			$this->adDescription = $adDescription;
		}

		public function getAdDescription() {
			return $this->adDescription;
		}
		/*--------------------
			Category
		 ---------------------*/
		public function setAdName($adName) {
			$this->adName = $adName;
		}

		public function getAdName() {
			return $this->adName;
		}
		/*--------------------
			Department Name
		 ---------------------*/
		 public function setStartDate($adStartDate) {
		 	$this->adStartDate = $adStartDate;
		 }

		 public function getStartDate() {
		 	return $this->adStartDate;
		 }
		 /*--------------------
			Purchase Cost
		 ---------------------*/
		 public function setEndDate($adEndDate) {
		 	$this->adEndDate = $adEndDate;
		 }

		 public function getEndDate() {
		 	return $this->adEndDate;
		 }
		 /*--------------------
			Full Retail Price
		 ---------------------*/
		 public function setAdType($type) {
		 	$this->type = $type;
		 }

		 public function getAdType() {
		 	return $this->type;
		 }
	}
?>