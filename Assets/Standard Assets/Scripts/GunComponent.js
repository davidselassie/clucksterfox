#pragma strict

public var spawnPeriod = 0.5f;
public var seed : Transform;

private var timeLastSpawned = 0.0f;
var stopped = false;

function Start () {
	seed.active = false;
}

function Update () {
	if(stopped == true) return;
	var currentLevelTime = Time.timeSinceLevelLoad;
	if(currentLevelTime - timeLastSpawned > spawnPeriod){
		timeLastSpawned = currentLevelTime;
		Spawn();
	}
}

function Spawn(){
	var clone : Transform;
	clone = Instantiate(seed.transform);
	clone.active = true;
	clone.position = transform.position;
	clone.forward = transform.forward;
}

function Stop(){
	stopped = true;
}