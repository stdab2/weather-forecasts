<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <router-link class="nav-link" :to="`/`">Weather</router-link>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <p class="nav-username">Hello
              </p>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="`/`">Home Page</router-link>
            </li>
            <li class="nav-item dropdown">
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
  
          <!-- Container for User Profile and SearchBar -->
          <div class="d-flex align-items-center">
            <ul class="utilisateur navbar-nav mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" :to="`/login`">Profile</router-link>
              </li>
            </ul>
            <!-- SearchBar Component -->
            <div class="search-bar-container ms-3">
              <SearchBar mode="navigate" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  </script>
  
  <style>
  .nav-username {
    padding-top: 8px;
    padding-left: 10px;
    padding-right: 30px;
    margin-bottom: 0px;
  }
  
  .utilisateur {
    margin-right: 20px;
  }
  
  .search-bar-container {
    display: flex;
    align-items: center;
  }
  </style>