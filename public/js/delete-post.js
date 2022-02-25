// create form handler that includes a fetch request for a backend route
async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: id
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

document.querySelector('.delete-btn').addEventListener('click', deleteFormHandler);