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
import test from 'tape'
import { spawnSync } from 'child_process'
import suiteName from './utils/suite'
import TestRepo from './utils/test-repo'
import gitDescribe from '../lib/git-describe'

const suite = suiteName(__filename)

const repoDir = path.join(__dirname, 'test-repo')
const repo = new TestRepo(repoDir)

test(`${suite} Fail if the given path is not a git repo`, (t) => {
  const fsRoot = __dirname.substring(0, __dirname.indexOf(path.sep) + 1)

  t.throws(function () {
    gitDescribe(fsRoot)
  }, new RegExp(/Not a git repository/))

  t.end()
})

test(`${suite} Return the sha of the parent repo if not given a path`, (t) => {
  const parentSha = spawnSync('git', ['describe', '--long', '--always'])
  const sha = gitDescribe()

  t.ok(sha.includes(parentSha.stdout.toString('utf-8').trim()))
  t.end()
})

test(`${suite} Prepends 0.0.0 and the commit count if the repo has no tags`, (t) => {
  repo.init()
  repo.initialCommit()

  const sha = gitDescribe(repoDir)

  t.ok(sha.includes('0.0.0-1-g'))

  repo.clean()
  t.end()
})
