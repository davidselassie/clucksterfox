#pragma strict

public var target : Transform;
public var hoverHeight : float = 10.0f;

static var up : Vector3 = new Vector3(0.0f, 1.0f, 0.0f);

// Update after all other updates so we look at the new position of the target.
function LateUpdate () {
	transform.position = target.position;
	transform.position.z = hoverHeight;
	transform.LookAt(target, up);
}
