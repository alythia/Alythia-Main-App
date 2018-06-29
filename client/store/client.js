import axios from 'axios'

const ADDED_NEW_PROJECT = 'ADDED_NEW_PROJECT'
const FETCHED_DEVELOPER_PROJECTS = 'FETCHED_DEVELOPER_PROJECTS'
const SET_CURRENT_PROJECT = 'CURRENT_PROJECT'

const initialState = {
  userProjects: [],
  currentProject: {}
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
      return{
        ...state,
        currentProject: action.currentProject
      }
    }
    default: {
      return state
    }
  }
}
