async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').innerHTML;
  const post_content = document.querySelector('#post-content').innerHTML;

  const response = await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
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
};

document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);

