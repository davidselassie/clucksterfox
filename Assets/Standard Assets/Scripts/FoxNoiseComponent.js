#pragma strict

public var noises : AudioClip[];

function Start () {
	StartCoroutine(MakeNoiseAndWaitLoop());
}

private function MakeNoiseAndWaitLoop () : IEnumerator {
	var index : int = Random.Range(0.0f, noises.Length);
	audio.PlayOneShot(noises[index]);
	yield WaitForSeconds(Random.Range(1.0f, 4.0f));
	StartCoroutine(MakeNoiseAndWaitLoop());
}
