﻿#pragma strict

private var playerControlsTag : String;

private var cameraComponent : OverheadCamera;
private var spawningComponent : SpawningComponent;
private var player : GameObject = null;

static class NextLevelParams {
	public var playerControlsTag : String = "Fox";
}

function Start () {
	cameraComponent = GameObject.FindGameObjectWithTag("MainCamera").GetComponent(OverheadCamera);
	spawningComponent = GetComponent(SpawningComponent);

	playerControlsTag = NextLevelParams.playerControlsTag;

	LinkControlToObjectOfTag(playerControlsTag);
}

// After we've updated all of the health, see if we need to link to a new object.
function LateUpdate () {
	if (!player) {
		LinkControlToObjectOfTag(playerControlsTag);
	}

	if (LevelOver()) {
		if (playerControlsTag == "Fox") {
			NextLevelParams.playerControlsTag = "Chicken";
		} else {
			NextLevelParams.playerControlsTag = "Fox";
		}
		Application.LoadLevel("TestScene");
	}
}

public function LevelOver () {
	return spawningComponent.DoneSpawning() && !GameObject.FindGameObjectWithTag(playerControlsTag);
}

public function LinkControlToObjectOfTag (desiredTag : String) : boolean {
	var nextObjectToAddPlayerComponent : GameObject = GameObject.FindGameObjectWithTag(desiredTag);

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
		Debug.Log(String.Format("No object with tag {0} to link user control to.", desiredTag));
		player = null;
	}
	return player != null;
}
