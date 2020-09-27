<script>

    let exercise = {};

    let userId;
    let description;
    let duration;
    let date;

    async function addExercise() {

        const body = new URLSearchParams();

        body.append('_id', userId);
        body.append('description', description);
        body.append('duration', duration);
        body.append('date', date);
        
        const res = await fetch('./api/exercise/add', {method: 'post', body});
        
        exercise = await res.json();

    }

</script>

<style>

    label {
        display: flex;
        flex-direction: column;
        max-width: 25vw;
    }

    .content {
        margin-left: 1em;
        margin-bottom: 1em;
    }

</style>



<h2>add exercise</h2>
<div class="content">
    <form id="addExerciseForm">
        <label>Userid: <input type="number" name="userId" bind:value={userId} /></label>
        <label>Description: <input type="text" name="description" bind:value={description} /></label>
        <label>Duration: <input type="number" name="duration" bind:value={duration} /></label>
        <label>Date: <input type="date" name="date" bind:value={date} /></label>
        <input type="button" value="add exercise" on:click={addExercise} />
    </form>
    {JSON.stringify(exercise)}
</div>
