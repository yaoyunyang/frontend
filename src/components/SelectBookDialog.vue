<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" width="1000px" @close="closeChangeBook">
      <div class="whole-css">
        <header class="head-css">
          <img class="logo-css" src="../assets/select-book-logo.png" alt="—°øŒ÷––ƒlogo" />
          <span class="title-css">我的课程</span>
          <div class="input-border-css">
            <el-input class="input-css" v-model="searchBook"></el-input>
            <el-button type="info" plain class="button-css" @click="searchBooks">搜索</el-button>
          </div>
        </header>
        <div class="body-css">
          <div class="left-css">
            <div class="left-body">
              <el-table
                :data="bookTableData"
                border
                class="table-css"
                :header-cell-style="tableCss"
              >
                <el-table-column prop="data" :label="bookRange" align="center" width="247px"></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="right-css">
            <div class="show-book-css">
              <div v-for="book in thisBooks" v-bind:key="book.id" class="book-total">
                <div class="book-font">{{book.data}}</div>
                <el-button
                  size="mini"
                  class="book-button"
                  @click="selectBook(book.id,book.data)"
                >选择教材</el-button>
              </div>
            </div>
            <footer class="right-foot-css">
              <el-pagination
                class="pagination-css"
                :page-size="1"
                :pager-count="5"
                layout="prev, pager, next"
                :total="totalPage"
                :current-page.sync="thisPage"
              ></el-pagination>
            </footer>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      totalPage: 0,
      dialogVisible: true,
      bookStatus: false,
      searchBook: '',
      thisPage: 0,
      bookRange: '我的课程',
      tableHeader:
        'color: black; font-size: 14px; background: #f6f6f6; height: 0; padding: 0;',
      bookTableData: [],
      thisBooks: []
    }
  },
  computed: {},
  methods: {
    tableCss ({ row, rowIndex }) {
      if (rowIndex === 0) {
        return this.tableHeader
      }
    },
    closeChangeBook () {
      this.bookStatus = false
      this.$emit('closeChangeBook', this.bookStatus)
    },
    selectBook (bookId, bookData) {
      this.$emit('getBookId', bookId)
      this.dialogVisible = false
    },
    searchBooks () {
      const that = this
      axios
        .get(that.baseUrl + '/words/searchbooks/', {
          params: {
            student_id: that.cookies.get('id'),
            category: that.searchBook
          }
        })
        .then(response => {
          let res = response.data
          if (res['code'] === 200) {
            that.bookTableData = res['data']
            let len = that.bookTableData.length
            that.totalPage = len / 3
            if (that.thisPage === 1) {
              that.thisBooks[0] = that.bookTableData[0]
              that.thisBooks[1] = that.bookTableData[1]
              that.thisBooks[2] = that.bookTableData[2]
              if (len - 1 < 0) {
                that.thisBooks.splice(0, 3)
              } else if (len - 1 < 1) {
                that.thisBooks.splice(1, 2)
              } else if (len - 2 < 2) {
                that.thisBooks.splice(2, 1)
              }
            } else {
              that.thisPage = 1
            }
          } else {
            that.bookTableData = []
            that.thisBooks = []
          }
        })
    }
  },
  created () {},
  watch: {
    thisPage: function (nowPage) {
      const that = this
      let len = that.bookTableData.length
      that.thisBooks[0] = that.bookTableData[(nowPage - 1) * 3]
      that.thisBooks[1] = that.bookTableData[(nowPage - 1) * 3 + 1]
      that.thisBooks[2] = that.bookTableData[(nowPage - 1) * 3 + 2]
      if ((nowPage - 1) * 3 > len - 1) {
        that.thisBooks.splice(0, 3)
      } else if ((nowPage - 1) * 3 + 1 > len - 1) {
        that.thisBooks.splice(1, 2)
      } else if ((nowPage - 1) * 3 + 1 > len - 2) {
        that.thisBooks.splice(2, 1)
      }
    }
  },
  mounted () {
    const that = this
    axios
      .get(that.baseUrl + '/words/getbooks/', {
        params: {
          student_id: that.cookies.get('id')
        }
      })
      .then(response => {
        let res = response.data
        if (res['code'] === 200) {
          that.bookTableData = res['data']
          let len = that.bookTableData.length
          that.totalPage = len / 3
          if (that.thisPage === 1) {
            that.thisBooks[0] = that.bookTableData[0]
            that.thisBooks[1] = that.bookTableData[1]
            that.thisBooks[2] = that.bookTableData[2]
            if (len - 1 < 0) {
              that.thisBooks.splice(0, 3)
            } else if (len - 1 < 1) {
              that.thisBooks.splice(1, 2)
            } else if (len - 2 < 2) {
              that.thisBooks.splice(2, 1)
            }
          } else {
            that.thisPage = 1
          }
        }
      })
    that.thisPage = 1
  }
}
</script>

<style scoped>
.el-dialog {
  background: #f6f6f6 !important;
}

.whole-css {
  display: flex;
  flex-direction: column;
  height: 480px;
  background: #f6f6f6;
}

.head-css {
  display: flex;
  height: 150px;
  width: 100%;
}

.logo-css {
  margin-top: 21px;
  margin-left: 10px;
  width: 30px;
  height: 30px;
}

.title-css {
  font-size: 18px;
  color: black;
  margin-top: 24px;
  margin-left: 3px;
}

.input-border-css {
  display: flex;
  width: 528px;
  margin-left: 245px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-right: 15px;
  padding-left: 15px;
  align-items: center;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
}

.input-css {
  margin-left: 25px;
}

.button-css {
  height: 40px;
  width: 100px;
  color: black;
  font-weight: 600;
  margin-left: 30px;
  margin-right: 30px;
}

.body-css {
  display: flex;
  border-top: 1px solid rgb(230, 230, 230);
  height: 400px;
  width: 100%;
}

.left-css {
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 350px;
}

.left-head {
  display: flex;
  margin-top: 10px;
  margin-left: 30px;
}

.left-body {
  margin-top: 20px;
  padding-left: 45px;
}

.left-button-first {
  border-left: 1.2px solid #909399;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-button-css {
  border-right: 1.2px solid #909399;
  width: 80px;
  height: 25px;
  font-size: 14px;
  margin: 0;
  line-height: 0;
  padding: 8px 0;
  color: black;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.onclick-left-button {
  border-right: 1.2px solid #909399;
  background: #3cab63;
  width: 70px;
  height: 14px;
  font-size: 14px;
  margin: 0;
  line-height: 10px;
  padding: 8px 0;
  color: black;
  text-align: center;
}

.left-button-css:hover {
  cursor: pointer;
  color: white;
  background: #06ad76;
}

.table-css {
  width: 250px;
  height: 320px;
  border: 1.5px solid rgb(230, 230, 230);
}

.right-css {
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 610px;
  margin-right: 27.5px;
}

.show-book-css {
  display: flex;
  width: 100%;
  height: 350px;
  padding-top: 60px;
  position: relative;
}

.book-total {
  margin-left: 30px;
  margin-right: 30px;
  height: 250px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.book-font {
  font-size: 18px;
  font-weight: 500;
  width: 120px;
  height: 170px;
  color: #316cd4;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: white;
  border: 1px solid #c0c0c0;
  border-radius: 3px;
}

.book-button {
  margin-top: 15px;
  height: 30px;
  width: 100px;
  border-radius: 5px;
}

.right-foot-css {
  display: flex;
  height: 50px;
  width: 100%;
  justify-content: center;
}

.pagination-css {
  margin-top: 8px;
}
</style>
