// create form handler that includes a fetch request for a backend route
async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const post_content = document.querySelector('#post-content').value.trim();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
    
    const response = await fetch(`/api/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        post_id: id,
        title,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }

}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);