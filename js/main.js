$(document).ready(function() {
  $("#searchUser").on("keyup", function(e) {
    let username = e.target.value;
    // Requesting Data From Github`s API
    $.ajax({
      url: "https://api.github.com/users/" + username,
      data: {
        client_id: Client_ID,
        client_secret: Client_Secret
      }
    }).done(function(user) {
      $.ajax({
        url: "https://api.github.com/users/" + username + "/repos",
        data: {
          client_id: Client_ID, // This is my personal access token
          client_secret: Client_Secret,
          sort: "created: asc",
          per_page: 5
        }
      }).done(function(repos) {
        $.each(repos, function(index, repo) {
          $("#repos").append(`
                <div class="card card-body bg-light mb-2">
                    <div class="row">
                        <div class="col-md-7">
                            <strong>${repo.name}</strong>: ${repo.description}
                        </div>
                        <div class="col-md-3">
                            <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                            <span class="badge badge-danger">Watchers: ${repo.watchers_count}</span>
                            <span class="badge badge-warning">Stars: ${repo.stargazers_count}</span>
                        </div>
                        <div class="col-md-2">
                            <a href="${repo.html_url}" target="_blank" class="btn btn-primary">Repo page</a>
                        </div>
                    </div>
                </div>
            `);
        });
      });
      $("#profile").html(`
        <div class="card border-primary mb-3" style="max-width: 100rem;">
            <div class="card-header"><h3>${user.name}</h3></div>
                <div class="card-body">
                    <div class="row">
                    <div class="col-md-3">
                    <img class="img-thumbnail" src="${user.avatar_url}">
                    <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
                        <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                        <span class="badge badge-success">Followers: ${user.followers}</span>
                        <span class="badge badge-info">Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
      `);
    });
  });
});
