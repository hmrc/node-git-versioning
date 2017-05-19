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

import test from 'tape'
import { version } from '../index'

const suite = `${__filename.substring(
  __filename.lastIndexOf('/') + 1,
  __filename.lastIndexOf('.')
)}:`

test(`${suite} Throw an exception when called without a tag`, (t) => {
  t.throws(function () {
    version()
  })

  t.end()
})

test(`${suite} Throw an exception when called with abcd123-dirty (an improperly formatted tag)`, (t) => {
  t.throws(function () {
    version('abcd123-dirty')
  })

  t.end()
})

test(`${suite} Return 1.0.0-1-gabcd123 given v1.0.0-1-gabcd123 (strip the 'v')`, (t) => {
  var formattedVersion = version('v1.0.0-1-gabcd123')

  t.equal(formattedVersion, '1.0.0-1-gabcd123')

  t.end()
})

test(`${suite} Return 1.0.0-0-g0000000 given v1.0.0-0-gabcd123 (same commit as the last tag)`, (t) => {
  var formattedVersion = version('v1.0.0-0-gabcd123')

  t.equal(formattedVersion, '1.0.0-0-g0000000')

  t.end()
})
