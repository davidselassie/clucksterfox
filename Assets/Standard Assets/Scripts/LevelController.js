#pragma strict

public var playerControlsTag : String;

private var cameraComponent : OverheadCamera;
private var player : GameObject = null;

function Start () {
	cameraComponent = GameObject.FindGameObjectWithTag("MainCamera").GetComponent(OverheadCamera);

	LinkControlToObjectOfTag(playerControlsTag);
}

// After we've updated all of the health, see if we need to link to a new object.
function LateUpdate () {
	if (!player) {
		LinkControlToObjectOfTag(playerControlsTag);
	}
}

public function LinkControlToObjectOfTag (tag : String) : boolean {
	var nextObjectToAddPlayerComponent : GameObject = GameObject.FindGameObjectWithTag(tag);

	if (nextObjectToAddPlayerComponent) {
		var aiComponent : AIFollowAttackComponent = nextObjectToAddPlayerComponent.GetComponent(AIFollowAttackComponent);
		if (aiComponent) {
			Destroy(aiComponent);
		}
		var inputComponent : PlatformInputController = nextObjectToAddPlayerComponent.GetComponent(PlatformInputController);
		if (!inputComponent) {
			nextObjectToAddPlayerComponent.AddComponent(PlatformInputController);
		}
		cameraComponent.target = nextObjectToAddPlayerComponent.transform;

		Debug.Log(String.Format("Player now controlling {0}.", nextObjectToAddPlayerComponent.GetInstanceID()));
		player = nextObjectToAddPlayerComponent;
	}
	else {
		Debug.Log(String.Format("No object with tag {0} to link user control to.", tag));
		player = null;
	}
	return player != null;
}
