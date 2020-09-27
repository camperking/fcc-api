<script>

    let user = {};

    async function addUser() {
        
        const body = new URLSearchParams();

        body.append('username', username.value);
        
        const res = await fetch('./api/exercise/new-user', {method: 'post', body});
        
        user = await res.json();

    }

</script>

<style>
    .content {
        margin-left: 1em;
        margin-bottom: 1em;
    }
</style>


<h2>add user</h2>
<div class="content">
    <form id="addUserForm">
        <label>Username: <input type="text" name="username" id="username" value="" /></label>
        <input type="button" value="add user" on:click={addUser} />
    </form>
    {JSON.stringify(user)}
</div>
