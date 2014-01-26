#pragma strict

public var target : Transform;

static var up : Vector3 = new Vector3(0.0f, 0.0f, 1.0f);

// Update after all other updates so we look at the new position of the target.
function LateUpdate () {
	transform.LookAt(target, up);
}
