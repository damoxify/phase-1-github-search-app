const githubForm = document.querySelector('#github-form');
const searchInput = document.querySelector('#search');
const userList = document.querySelector('#user-list');
const reposList = document.querySelector('#repos-list');
const searchTypeBtn = document.querySelector('#search-type');

let currentSearchType = 'user';


    githubForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        
        if (currentSearchType === 'user') {
          searchUsers(searchTerm);
        } else {
          searchRepos(searchTerm);
        }
      });
      
      userList.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
          const username = e.target.innerText;
          getUserRepos(username);
        }
      });
      
      searchTypeBtn.addEventListener('click', function () {
        currentSearchType = currentSearchType === 'user' ? 'repo' : 'user';
        searchInput.placeholder = `Search ${currentSearchType === 'user' ? 'users' : 'repos'}`;
      });
      
      function searchUsers(query) {
        userList.innerHTML = '';
      
        // API request to search users
        fetch(`https://api.github.com/search/users?q=${query}`)
          .then(response => response.json())
          .then(data => {
            const users = data.items;
      
            // To display each user in the userList
            users.forEach(user => {
              const userItem = document.createElement('li');
              userItem.textContent = user.login;
      
              userList.appendChild(userItem);
            });
          })
          .catch(error => console.error('Error fetching user data:', error));
      }
      
      
      function searchRepos(query) {
        reposList.innerHTML = '';
      
        // API request to search repositories
        fetch(`https://api.github.com/search/repositories?q=${query}`)
          .then(response => response.json())
          .then(data => {
            const repos = data.items;
      
            // To display each repository in the reposList
            repos.forEach(repo => {
              const repoItem = document.createElement('li');
              repoItem.innerHTML = `
                <a href="${repo.html_url}" target="_blank">${repo.full_name}</a>
              `;
      
              reposList.appendChild(repoItem);
            });
          })
          .catch(error => console.error('Error fetching repository data:', error));
      }
      
      
      function getUserRepos(username) {
        reposList.innerHTML = '';
      
        //  API request to get user's repositories
        fetch(`https://api.github.com/users/${username}/repos`)
          .then(response => response.json())
          .then(repos => {
            // To display each repository in the reposList
            repos.forEach(repo => {
              const repoItem = document.createElement('li');
              repoItem.innerHTML = `
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              `;
      
              reposList.appendChild(repoItem);
            });
          })
          .catch(error => console.error('Error fetching user repository data:', error));
      }
      
      

