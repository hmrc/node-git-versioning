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

import { spawnSync } from 'child_process'

const gitDescribe = (gitDir) => {
  let gitArgs = [
    'describe',
    '--long',
    '--always'
  ]

  if (gitDir) {
    gitArgs = [
      `--git-dir=${gitDir}`,
      `--work-tree=${gitDir}`
    ].concat(gitArgs)
  }

  const git = spawnSync('git', gitArgs)

  if (git.error) {
    console.log('git.error', git.error)
    throw new Error(git.error)
  }

  if (git.status !== 0) {
    throw new Error(`${git.status}: ${git.stderr.toString('utf-8')}`)
  }

  return git.stdout.toString().trim()
}

export default gitDescribe
