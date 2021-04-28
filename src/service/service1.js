import axios from 'axios';

export const Service1 = {
  baseRoute: "https://breakingbadapi.com/",

  getList(params) {
    return axios.get(this.baseRoute + "api/characters", { params })
  },

  getCharacter(params) {
    return axios.get(this.baseRoute + "api/characters/" + params.id)
  }

}