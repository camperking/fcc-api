<script>

    let userId;
    let from = "2020-09-01";
    let to = "2020-12-31";
    let limit = 3;

    let logs = {};
    let showLogs = false;

    async function getLogs() {

        const query = new URLSearchParams();

        query.append('userId', userId);
        query.append('from', from);
        query.append('to', to);
        query.append('limit', limit);

        const res = await fetch('./api/exercise/log?'+ query.toString());

        logs = await res.json();

        showLogs = true;

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


<h2>get logs</h2>
<div class="content">
    <form>
        <label>Userid: <input type="number" name="userId" bind:value={userId} /></label>
        <label>From: <input type="date" name="from" bind:value={from} /></label>
        <label>To: <input type="date" name="to" bind:value={to} /></label>
        <label>Limit: <input type="number" name="limit" bind:value={limit} /></label>
        <input type="button" value="get logs" on:click={getLogs} />
    </form>
</div>
{#if showLogs}
    <input type="button" value="hide users" on:click={() => {showLogs = false}} />
    {JSON.stringify(logs)}
{/if}