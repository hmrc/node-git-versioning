/*
 * Copyright 2017 HM Revenue & Customs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import path from 'path'
import rimraf from 'rimraf'
import { spawnSync } from 'child_process'

class TestRepo {
  constructor (dir) {
    this.dir = path.normalize(dir)
  }

  execGit () {
    const git = spawnSync('git', [...arguments], {
      cwd: this.dir
    })

    return git
  }

  init () {
    this.execGit('init')
  }

  clean () {
    rimraf.sync(path.join(this.dir, '.git'))
  }

  initialCommit () {
    this.execGit('add', '.')
    this.execGit('commit', '--message', '"Initial commit"')
  }
}

export default TestRepo
