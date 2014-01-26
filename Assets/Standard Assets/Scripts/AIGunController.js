#pragma strict

public var gun : Transform;
private var attackTag : String = "Fox";

// Use this for initialization
function Awake () {
	var point = Vector3.right + transform.position;
	transform.LookAt(point,Vector3.forward);
}

// Update is called once per frame
function Update () {
	var closestLivingObject = FindAttack();
	transform.LookAt(closestLivingObject.transform.position,Vector3.forward);
}

private function FindAttack () : GameObject {
	var closestLivingObject : GameObject = null;
	var closestDistance : float = Mathf.Infinity;
	for (var current : GameObject in GameObject.FindGameObjectsWithTag(attackTag)) {
		var currentDistance : float = Vector3.Distance(transform.position, current.transform.position);
		if (currentDistance < closestDistance && current != gameObject) {
			closestLivingObject = current;
			closestDistance = currentDistance;
		}
	}
	return closestLivingObject;
}