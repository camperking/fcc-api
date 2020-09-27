<script>

    let users = [];

    let showUsers = false;

    async function getUsers() {

        const res = await fetch('./api/exercise/users');

        users = await res.json();
        
        showUsers = true;

    }


</script>

<style>
    .content {
        margin-left: 1em;
        margin-bottom: 1em;
    }
</style>

<h2>get all users</h2>
<div class="content">
    <input type="button" value="get users" on:click={getUsers} />
    {#if showUsers}
    <input type="button" value="hide users" on:click={() => {showUsers = false}} />
        <ul>
            {#each users as user}
                <li>{JSON.stringify(user)}</li>
            {/each}
        </ul>
    {/if}
</div>