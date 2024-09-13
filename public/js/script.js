(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          // Custom image field validation
          const imageInput = form.querySelector('#imageInput');
          const fileError = form.querySelector('#fileError');
          const maxFileSize = 2 * 1024 * 1024; // 2MB
          const allowedExtensions = ['jpg', 'jpeg', 'png'];
          
          if (imageInput && imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const fileSize = file.size;
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (fileSize > maxFileSize) {
              event.preventDefault();
              event.stopPropagation();
              fileError.style.display = 'block';
              fileError.innerText = 'File size must be less than 2MB';
              imageInput.classList.add('is-invalid');
            } else if (!allowedExtensions.includes(fileExtension)) {
              event.preventDefault();
              event.stopPropagation();
              fileError.style.display = 'block';
              fileError.innerText = 'Only .jpg, .jpeg, .png files are allowed';
              imageInput.classList.add('is-invalid');
            } else {
              fileError.style.display = 'none';
              imageInput.classList.remove('is-invalid');
            }
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })();

  let taxSwitche = document.getElementById("flexSwitchCheckDefault");
  taxSwitche.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for (info of taxInfo) {
      if (info.style.display != "inline") {
        info.style.display = "inline";
      } else {
        info.style.display = "none";
      }
    }
  });
