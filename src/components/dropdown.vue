<template>
  <div>
    <div id="app">
      <header class="header">
        <nav class="header__nav">
          <ul class="header__navbar">
            <li class="header__item">
              <a href="#" class="header__link">
                <transition name="slide-fade">
                  <!-- Header Navigation Menu Icons -->
                  <button
                    class="header--button"
                    v-if="show"
                    key="on"
                    @click="show = false"
                  >
                    <svg viewBox="0 0 24 24" class="header--icon">
                      <title>Close</title>
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path
                        d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                      />
                    </svg>
                  </button>
                  <button
                    class="header--button"
                    v-else
                    key="off"
                    @click="show = true"
                  >
                    <img src="@/assets/filterLogo.png" class="header--icon" />
                  </button>
                </transition>
              </a>
              <!-- Dropdown Menu -->
              <transition name="dropdown">
                <div
                  class="dropdown__menu"
                  v-bind:class="{ active: show }"
                  v-if="show"
                >
                  <ul class="dropdown__menu-nav">
                    <!--
                    <li
                      class="dropdown__menu-item"
                      @click="startFiltering('filterByName')"
                    >
                      <a
                        href="#"
                        class="dropdown__menu-link"
                        @click="show = false"
                      >
                        <div class="dropdown__menu-svg">
                          <svg viewBox="0 0 20 20">
                            <path
                              fill="currentColor"
                              d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"
                            />
                          </svg>
                        </div>
                        <div
                          v-if="this.$store.state.language == 'de'"
                          class="dropdown__menu-text"
                        >
                          Alphabetisch ordnen
                        </div>
                        <div
                          v-if="this.$store.state.language == 'en'"
                          class="dropdown__menu-text"
                        >
                          Sort alphabetically
                        </div>
                      </a>
                    </li>
                    -->
                    <li
                      class="dropdown__menu-item"
                      @click="startFiltering('filterByDate')"
                    >
                      <a
                        href="#"
                        class="dropdown__menu-link"
                        @click="show = false"
                      >
                        <div class="dropdown__menu-svg">
                          <svg viewBox="2 2 16 16">
                            <path
                              fill="currentColor"
                              d="M16.254,3.399h-0.695V3.052c0-0.576-0.467-1.042-1.041-1.042c-0.576,0-1.043,0.467-1.043,1.042v0.347H6.526V3.052c0-0.576-0.467-1.042-1.042-1.042S4.441,2.476,4.441,3.052v0.347H3.747c-0.768,0-1.39,0.622-1.39,1.39v11.813c0,0.768,0.622,1.39,1.39,1.39h12.507c0.768,0,1.391-0.622,1.391-1.39V4.789C17.645,4.021,17.021,3.399,16.254,3.399z M14.17,3.052c0-0.192,0.154-0.348,0.348-0.348c0.191,0,0.348,0.156,0.348,0.348v0.347H14.17V3.052z M5.136,3.052c0-0.192,0.156-0.348,0.348-0.348S5.831,2.86,5.831,3.052v0.347H5.136V3.052z M16.949,16.602c0,0.384-0.311,0.694-0.695,0.694H3.747c-0.384,0-0.695-0.311-0.695-0.694V7.568h13.897V16.602z M16.949,6.874H3.052V4.789c0-0.383,0.311-0.695,0.695-0.695h12.507c0.385,0,0.695,0.312,0.695,0.695V6.874z M5.484,11.737c0.576,0,1.042-0.467,1.042-1.042c0-0.576-0.467-1.043-1.042-1.043s-1.042,0.467-1.042,1.043C4.441,11.271,4.908,11.737,5.484,11.737z M5.484,10.348c0.192,0,0.347,0.155,0.347,0.348c0,0.191-0.155,0.348-0.347,0.348s-0.348-0.156-0.348-0.348C5.136,10.503,5.292,10.348,5.484,10.348z M14.518,11.737c0.574,0,1.041-0.467,1.041-1.042c0-0.576-0.467-1.043-1.041-1.043c-0.576,0-1.043,0.467-1.043,1.043C13.475,11.271,13.941,11.737,14.518,11.737z M14.518,10.348c0.191,0,0.348,0.155,0.348,0.348c0,0.191-0.156,0.348-0.348,0.348c-0.193,0-0.348-0.156-0.348-0.348C14.17,10.503,14.324,10.348,14.518,10.348z M14.518,15.212c0.574,0,1.041-0.467,1.041-1.043c0-0.575-0.467-1.042-1.041-1.042c-0.576,0-1.043,0.467-1.043,1.042C13.475,14.745,13.941,15.212,14.518,15.212z M14.518,13.822c0.191,0,0.348,0.155,0.348,0.347c0,0.192-0.156,0.348-0.348,0.348c-0.193,0-0.348-0.155-0.348-0.348C14.17,13.978,14.324,13.822,14.518,13.822z M10,15.212c0.575,0,1.042-0.467,1.042-1.043c0-0.575-0.467-1.042-1.042-1.042c-0.576,0-1.042,0.467-1.042,1.042C8.958,14.745,9.425,15.212,10,15.212z M10,13.822c0.192,0,0.348,0.155,0.348,0.347c0,0.192-0.156,0.348-0.348,0.348s-0.348-0.155-0.348-0.348C9.653,13.978,9.809,13.822,10,13.822z M5.484,15.212c0.576,0,1.042-0.467,1.042-1.043c0-0.575-0.467-1.042-1.042-1.042s-1.042,0.467-1.042,1.042C4.441,14.745,4.908,15.212,5.484,15.212z M5.484,13.822c0.192,0,0.347,0.155,0.347,0.347c0,0.192-0.155,0.348-0.347,0.348s-0.348-0.155-0.348-0.348C5.136,13.978,5.292,13.822,5.484,13.822z M10,11.737c0.575,0,1.042-0.467,1.042-1.042c0-0.576-0.467-1.043-1.042-1.043c-0.576,0-1.042,0.467-1.042,1.043C8.958,11.271,9.425,11.737,10,11.737z M10,10.348c0.192,0,0.348,0.155,0.348,0.348c0,0.191-0.156,0.348-0.348,0.348s-0.348-0.156-0.348-0.348C9.653,10.503,9.809,10.348,10,10.348z"
                            />
                          </svg>
                        </div>
                        <div v-if="this.$store.state.language == 'de'" class="dropdown__menu-text">
                          Nach Datum sortieren
                        </div>
                        <div v-if="this.$store.state.language == 'en'" class="dropdown__menu-text">
                          Sort by date
                        </div>
                      </a>
                    </li>
                    <li
                      class="dropdown__menu-item"
                      @click="startFiltering('filterByDatatype')"
                    >
                      <a
                        href="#"
                        class="dropdown__menu-link"
                        @click="show = false"
                      >
                        <div class="dropdown__menu-svg">
                          <svg class="svg-icon" viewBox="2 2 16 16">
                            <path
                              fill="currentColor"
                              d="M15.475,6.692l-4.084-4.083C11.32,2.538,11.223,2.5,11.125,2.5h-6c-0.413,0-0.75,0.337-0.75,0.75v13.5c0,0.412,0.337,0.75,0.75,0.75h9.75c0.412,0,0.75-0.338,0.75-0.75V6.94C15.609,6.839,15.554,6.771,15.475,6.692 M11.5,3.779l2.843,2.846H11.5V3.779z M14.875,16.75h-9.75V3.25h5.625V7c0,0.206,0.168,0.375,0.375,0.375h3.75V16.75z"
                            />
                          </svg>
                        </div>
                        <div v-if="this.$store.state.language == 'de'" class="dropdown__menu-text">
                          Nach Dateityp sortieren
                        </div>
                        <div v-if="this.$store.state.language == 'en'" class="dropdown__menu-text">
                          Sort by datatype
                        </div>
                      </a>
                    </li>
                    <li
                      class="dropdown__menu-item"
                      @click="startFiltering('filterBySize')"
                    >
                      <a
                        href="#"
                        class="dropdown__menu-link"
                        @click="show = false"
                      >
                        <div class="dropdown__menu-svg">
                          <svg class="svg-icon" viewBox="2 2 16 16">
                            <path
                              fill="currentColor"
                              d="M17.064,4.656l-2.05-2.035C14.936,2.544,14.831,2.5,14.721,2.5H3.854c-0.229,0-0.417,0.188-0.417,0.417v14.167c0,0.229,0.188,0.417,0.417,0.417h12.917c0.229,0,0.416-0.188,0.416-0.417V4.952C17.188,4.84,17.144,4.733,17.064,4.656M6.354,3.333h7.917V10H6.354V3.333z M16.354,16.667H4.271V3.333h1.25v7.083c0,0.229,0.188,0.417,0.417,0.417h8.75c0.229,0,0.416-0.188,0.416-0.417V3.886l1.25,1.239V16.667z M13.402,4.688v3.958c0,0.229-0.186,0.417-0.417,0.417c-0.229,0-0.417-0.188-0.417-0.417V4.688c0-0.229,0.188-0.417,0.417-0.417C13.217,4.271,13.402,4.458,13.402,4.688"
                            />
                          </svg>
                        </div>
                        <div v-if="this.$store.state.language == 'de'" class="dropdown__menu-text">
                          Nach Dateigröße sortieren
                        </div>
                        <div v-if="this.$store.state.language == 'en'" class="dropdown__menu-text">
                         Sort by file size
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </transition>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    startFiltering(filterByWhat) {
      this.$emit("newFilter", filterByWhat);
    },
  },
};
</script>

<style lang="scss" scoped>
$rosblue: #0047bb;
$rosfont: montserrat;

:root {
  --font-primary: "Open Sans", sans-serif;
  --color-gray: #dadce0;
}

// Global
* {
  list-style-type: none;
  font-family: $rosfont;
}
*,
::after,
::before {
  box-sizing: border-box;
}

body {
  font-size: 1rem;
  -webkit-text-size-adjust: 100%;
  font-family: var(--font-primary);
  overflow: hidden;
}
hr {
  border: 0;
  height: 0;
  margin: 1.5rem 0;
  border-top: 1px solid var(--color-gray);
}

// Header Menu

.header {
  padding: 11px;

  &__nav {
    position: relative;
  }
  &__navbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &__item {
    padding: 1rem;
  }
  &--icon {
    width: 1.65rem;
    height: 1.65rem;
  }
  &--button {
    top: 0;
    right: 0;
    position: absolute;
    margin: 0;
    padding: 0;
    color: gray;
    cursor: pointer;
    border: 1px solid transparent;
    background-color: transparent;
    &:focus {
      outline: 0;
    }
  }
}

// Dropdown Menu

.dropdown__menu {
  top: 100%;
  right: 0;
  position: absolute;
  z-index: 10;
  height: 25rem;
  min-width: 250px;
  margin-top: 1rem;
  overflow-y: auto;
  padding: 10px;
  padding-left: 0;
  border-radius: 12px;
  background-color: white;
  border: 1px solid var(--color-gray);
  background-clip: padding-box;
  &-link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.6);
    padding: 0.8rem 0 0.8rem 1rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 0 50px 50px 0;
    &:hover {
      color: $rosblue;
      background-color: #f4faff;
    }
  }
  &-svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  &-text {
    font-weight: 300;
    margin-left: 1rem;
    margin-right: 1rem;
  }
}

// Animation Menu Icon

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s;
}
.slide-fade-enter,
.slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(31px);
}
.slide-fade-leave-active {
  transform: translateX(-31px);
}

// Dropdown Menu Animation

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 1s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

// Wrapper

.main {
  margin: 6rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &__subtitle {
    color: #4f5959;
    font-weight: 100;
    margin-bottom: 2rem;
  }
  &__link {
    margin-right: 1.5rem;
    display: inline-block;
    &:last-child {
      margin-right: 0;
    }
  }
  &__svg {
    width: 2rem;
    height: 2rem;
    opacity: 0.6;
    color: #94a2b0;
    &:hover {
      color: #ffad1f;
    }
  }
}
</style>