import axios from 'axios'

const ADDED_NEW_PROJECT = 'ADDED_NEW_PROJECT'
const FETCHED_DEVELOPER_PROJECTS = 'FETCHED_DEVELOPER_PROJECTS'
const SET_CURRENT_PROJECT = 'CURRENT_PROJECT'
const DARKEN_NAVBAR = 'DARKEN_NAVBAR'
const GENERATE_NEW_TOKEN = 'GENERATE_NEW_TOKEN'

const initialState = {
  userProjects: [],
  currentProject: {},
  darkenNavbar: false
}

const setCurrentProject = currentProject => ({
  type: SET_CURRENT_PROJECT,
  currentProject
})
const addedNewProject = project => ({
  type: ADDED_NEW_PROJECT,
  project
})
const fetchedUserProjects = projects => ({
  type: FETCHED_DEVELOPER_PROJECTS,
  projects
})

const darkenNavbar = darken => ({
  type: DARKEN_NAVBAR,
  darken
})

const generatedNewToken = client => ({
  type: GENERATE_NEW_TOKEN,
  client
})

export const addedCurrentProject = currentProject => {
  return dispatch => {
    dispatch(setCurrentProject(currentProject))
  }
}

export const addNewProject = project => async dispatch => {
  const {data} = await axios.post('/api/clients/new-project', project)
  dispatch(addedNewProject(data))
}

export const fetchUserProjects = developerId => async dispatch => {
  const {data} = await axios.get(`/api/developers/${developerId}/projects`)
  dispatch(fetchedUserProjects(data.clients))
}

export const changeBackgroudColor = bool => dispatch => {
  dispatch(darkenNavbar(bool))
}

export const generateNewToken = clientUUID => async dispatch => {
  const {data} = await axios.put(`/api/clients/${clientUUID}`)
  dispatch(generatedNewToken(data))
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADDED_NEW_PROJECT: {
      return {
        ...state,
        userProjects: [...state.userProjects, action.project]
      }
    }
    case FETCHED_DEVELOPER_PROJECTS: {
      return {
        ...state,
        userProjects: action.projects
      }
    }
    case SET_CURRENT_PROJECT: {
      return {
        ...state,
        currentProject: action.currentProject
      }
    }
    case DARKEN_NAVBAR: {
      return {
        ...state,
        darkenNavbar: action.darken
      }
    }
    case GENERATE_NEW_TOKEN: {
      return {
        ...state,
        currentProject: action.client,
        userProjects: [
          ...state.userProjects.filter(
            client =>
              client.UUID === action.client.UUID ? action.client : client
          )
        ]
      }
    }
    default: {
      return state
    }
  }
}
